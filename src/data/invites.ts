export interface InviteData {
  id: string;
  name: string;
  position: string;
  department: string;
  message?: string;
}

export const invites: InviteData[] = [
  {
    id: "alpha-7",
    name: "Dr. Rasika Ranaweera",
    position: "Dean",
    department: "Faculty of Computing",
    message:
      "Your expertise in quantum computing will be invaluable to our mission.",
  },
  {
    id: "beta-9",
    name: "Marcus Kane",
    position: "Senior Systems Architect",
    department: "Core Engineering",
    message:
      "We need your visionary approach to break through our current limitations.",
  },
  {
    id: "gamma-3",
    name: "Dr. Sarah Chen",
    position: "Lead Researcher",
    department: "Advanced AI Lab",
    message:
      "Your research on neural networks aligns perfectly with our objectives.",
  },
  {
    id: "delta-5",
    name: "Alex Rivera",
    position: "Cybersecurity Specialist",
    department: "Defense Operations",
    message:
      "Your skills in encryption will help secure our most critical systems.",
  },
  {
    id: "epsilon-2",
    name: "Dr. James Park",
    position: "Data Science Director",
    department: "Analytics Center",
    message:
      "Your insights into big data will accelerate our discovery process.",
  },
  {
    id: "zeta-8",
    name: "Nina Rodriguez",
    position: "UX Research Lead",
    department: "Human Factors",
    message:
      "Your understanding of human cognition will guide our interface design.",
  },
];

export const getInviteById = (id: string): InviteData | undefined => {
  return invites.find((invite) => invite.id === id);
};
