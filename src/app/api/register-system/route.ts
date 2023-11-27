import { NextRequest, NextResponse } from "next/server";
import slugify from "react-slugify";
import * as bcrypt from "bcrypt";
import { query } from "@/lib/db";
import { SystemType } from "@/types/typings";

export async function POST(req: NextRequest) {
  try {
    const {
      system_name,
      firstname,
      lastname,
      email,
      password,
      repeat_password,
    } = await req.json();

    if (
      !system_name ||
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !repeat_password
    ) {
      return new NextResponse(
        JSON.stringify({ message: "All fields are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (password !== repeat_password) {
      return new NextResponse(
        JSON.stringify({ message: "Passwords do not match" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const name = slugify(system_name);

    const nameSlug = "ceodash_" + slugify(system_name);

    const date = new Date();

    // Check if system name already exists
    const checkSystem = `SELECT * FROM systems WHERE slug = ?`;
    const checkSystemRes = (await query("ceo_control_panel", checkSystem, [
      name,
    ])) as Array<SystemType>;

    if (checkSystemRes.length > 0) {
      // System with the same name exists
      return new NextResponse(
        JSON.stringify({ message: "System already exists" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const addSystem = `INSERT INTO systems (name, slug, created) VALUES(?, ?, ?)`;
    const addSystemRes = await query("ceo_control_panel", addSystem, [
      system_name,
      name,
      date,
    ]);

    const createDatabase = `CREATE DATABASE ${nameSlug}`;
    const createDatabaseRes = await query(
      "ceo_control_panel",
      createDatabase,
      []
    );

    const createUsersTable = `CREATE TABLE users(
		id INT AUTO_INCREMENT PRIMARY KEY,
		firstname VARCHAR(255) NOT NULL,
		lastname VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL UNIQUE,
		password VARCHAR(255) NOT NULL
	)`;
    const createUsersTableRes = await query(nameSlug, createUsersTable, []);

    const createEmailVerificationsTable = `CREATE TABLE email_verifications(
		id VARCHAR(255) PRIMARY KEY,
		user_payload JSON NOT NULL
		)`;
    const createEmailVerificationsTableRes = await query(
      nameSlug,
      createEmailVerificationsTable,
      []
    );

    const createPasswordRecoveryTable = `CREATE TABLE password_recovery(
		id VARCHAR(255) PRIMARY KEY,
		user_id INT NOT NULL,
		expiration_date TIMESTAMP NOT NULL
		)`;
    const createPasswordRecoveryTableRes = await query(
      nameSlug,
      createPasswordRecoveryTable,
      []
    );

    const addUser = `INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const addUserRes = await query(nameSlug, addUser, [
      firstname,
      lastname,
      email,
      hashedPassword,
    ]);

    return new NextResponse(
      JSON.stringify({
        message: "System created successfully!",
        slug: name,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
