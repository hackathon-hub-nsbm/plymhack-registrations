"use server";

import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { TeamType } from "@/types/user";

// team creating function
export async function createUser(team: TeamType): Promise<TeamType> {
  try {
    const teamsRef = collection(db, "teams");

    // checks if the team already exists
    const teamRef = collection(db, "teams");
    const q = query(teamRef, where("team_email", "==", team.team_email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("Team already exists");
    }

    const docRef = await addDoc(teamsRef, {
      team_name: team.team_name,
      team_email: team.team_email,
      team_phone_number: team.team_phone_number,
      isMember: team.isMember,
      members: team.members,
      created_at: new Date(),
    });

    return {
      ...team,
    };
  } catch (error) {
    console.error("Error creating team:", error);
    throw error;
  }
}
