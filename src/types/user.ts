import * as z from "zod";

const MemberSchema = z.object({
  name: z.string().regex(/^[a-zA-Z\s]{2,32}$/, "Please enter a valid name"),
  batch: z.enum(
    ["25.3", "25.2", "25.1", "24.3", "24.2", "24.1", "23.2", "23.1", "22.2"],
    "Please select a valid batch"
  ),
  degree: z.enum(
    [
      "Artificial Intelligence",
      "Computer Science",
      "Data Science",
      "Computer Security",
      "Cyber Security",
      "Computer Networks",
      "Software Engineering",
      "Technology Management",
      "Management Information Systems",
    ],
    "Please select a valid degree"
  ),
});

export const TeamSchema = z.object({
  team_name: z.string().min(2, "Team name must be at least 2 characters"),
  team_email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  team_phone_number: z
    .string()
    .regex(/^[+]?[\d\s\-()]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits"),
  members: z
    .array(MemberSchema)
    .min(3, "A team must have at least 3 members")
    .max(4, "A team can have at most 4 members"),
});

export type TeamType = z.infer<typeof TeamSchema>;
export type MemberType = z.infer<typeof MemberSchema>;
