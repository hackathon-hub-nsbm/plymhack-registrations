#!/usr/bin/env bun

import { collection, getDocs } from "firebase/firestore";
import { db } from "../src/config/firebase";
import * as XLSX from "xlsx";
import { writeFileSync } from "fs";
import { join } from "path";

async function exportTeams() {
  try {
    console.log("📥 Fetching teams from Firebase...");

    const teamsRef = collection(db, "teams");
    const querySnapshot = await getDocs(teamsRef);

    const teams = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!teams || teams.length === 0) {
      console.log("⚠️  No teams found in database");
      process.exit(0);
    }

    console.log(`✅ Found ${teams.length} team(s)`);
    console.log("📊 Preparing Excel data...");

    // Prepare data for Excel export
    const excelData: any[] = [];

    teams.forEach((team: any) => {
      const baseInfo = {
        "Team Name": team.team_name,
        "Team Email": team.team_email,
        "Team Phone": team.team_phone_number,
        "Created At": team.created_at?.toDate
          ? team.created_at.toDate().toISOString()
          : team.created_at,
      };

      // Add each member as a separate row with team info
      if (team.members && team.members.length > 0) {
        team.members.forEach((member: any, index: number) => {
          excelData.push({
            ...baseInfo,
            "Member #": index + 1,
            "Member Name": member.name,
            "Member Batch": member.batch,
            "Member Degree": member.degree,
          });
        });
      } else {
        // If no members, add team info only
        excelData.push({
          ...baseInfo,
          "Member #": "",
          "Member Name": "",
          "Member Batch": "",
          "Member Degree": "",
        });
      }
    });

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Auto-size columns
    const colWidths = [
      { wch: 20 }, // Team Name
      { wch: 30 }, // Team Email
      { wch: 15 }, // Team Phone
      { wch: 25 }, // Created At
      { wch: 10 }, // Member #
      { wch: 25 }, // Member Name
      { wch: 12 }, // Member Batch
      { wch: 30 }, // Member Degree
    ];
    worksheet["!cols"] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Teams");

    // Generate filename with timestamp
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .split("T")[0];
    const filename = `teams-export-${timestamp}.xlsx`;
    const filepath = join(process.cwd(), filename);

    // Write the file
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    writeFileSync(filepath, excelBuffer);

    console.log(`\n✨ Export successful!`);
    console.log(`📁 File saved to: ${filename}`);
    console.log(`📊 Total rows exported: ${excelData.length}`);
  } catch (error) {
    console.error("❌ Error exporting teams:", error);
    process.exit(1);
  }
}

// Run the export
exportTeams();
