import pgPromise from 'pg-promise';
import 'dotenv/config';
import path from 'path'

const db_password = process.env.POSTGRES_PASSWORD;
const db_user = process.env.POSTGRES_USER;
const db_host = process.env.POSTGRES_HOST;
const db_port = process.env.POSTGRES_PORT;

const pgp = pgPromise({});
const db = pgp(`postgres://${db_user}:${db_password}@${db_host}:${db_port}/${db_user}`);

const init_file = new pgp.QueryFile('./database/init_db.sql');

await db.none(init_file);

// FUNCTIONS

// donors
export async function getDonors(first_name="", last_name="") {
    const vulnerable_string = `SELECT * FROM donor WHERE first_name ILIKE '%${first_name}%' AND last_name ILIKE '%${last_name}%';`
    return await db.any(vulnerable_string); // vulnerable line
}

export async function getDonorDetails(donorID) {

    const ps1 = new pgp.PreparedStatement({
        name: 'get_donor',
        text: 'SELECT * from donor WHERE id=$1;',
        values: [donorID]
    });

    const ps2 = new pgp.PreparedStatement({
        name: 'get_donations',
        text: 'SELECT * FROM donation WHERE donor_id=$1;',
        values: [donorID]
    });
    
    const donor = await db.one(ps1);
    const donations = await db.any(ps2);

    return {
        donor,
        donations: donations.map(donation => ({
            id: donation.id,
            amount: donation.amount,
            currency: donation.currency,
            donation_date: donation.donation_date }))
    };
}

// donations
export async function getDonations() {
    return await db.any("SELECT * FROM donation;")
}

export async function getDonationDetails(donationID) {
    const ps = new pgp.PreparedStatement({
        name: 'get_donation_details',
        text: 'SELECT donation.*, donor.first_name as donor_first_name, donor.last_name as donor_last_name FROM donation JOIN donor ON donor.id = donation.donor_id WHERE donation.id=$1;',
        values: [donationID]
      });
      
    return await db.one(ps);
}