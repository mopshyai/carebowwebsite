export interface TeamMember {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  image: string;
  location: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  funFact?: string;
  expertise: string[];
}

export const team: TeamMember[] = [
  {
    id: 'manvendra',
    name: 'Manvendra',
    role: 'Founder & CEO',
    shortBio: 'Building CareBow to solve a problem he faced personally — caring for aging parents from afar.',
    fullBio: `Manvendra founded CareBow after experiencing firsthand the challenges of caring for elderly parents while living abroad. With a background in technology and a deep understanding of Indian family values, he's on a mission to help millions of families stay connected with their aging parents.

Before CareBow, Manvendra worked in technology and saw how AI could transform healthcare accessibility. He combined his technical expertise with his personal experience to create a platform that truly understands what families need.

He believes that technology should enhance human connection, not replace it. That's why CareBow combines AI-powered tools with dedicated human coordinators who become part of your extended family.`,
    image: '/team/manvendra.jpg',
    location: 'India',
    linkedin: 'https://www.linkedin.com/in/manvendrax7/',
    twitter: 'https://x.com/manvendrax7',
    email: 'manvendra@carebow.com',
    funFact: 'Calls his parents every single day, no matter how busy the schedule.',
    expertise: ['Product Strategy', 'AI/ML', 'Healthcare Tech', 'Investor Relations'],
  },
  {
    id: 'ayush',
    name: 'Ayush',
    role: 'Co-Founder & COO',
    shortBio: 'Operations mastermind ensuring every family gets exceptional care experience.',
    fullBio: `Ayush leads operations at CareBow, building the systems and partnerships that make seamless care possible. He's the person who ensures that when you book a doctor visit, they actually show up on time with a smile.

With experience in operations and vendor management, Ayush has built CareBow's network of trusted healthcare providers, caregivers, and service partners across multiple cities. He personally vets every caregiver and maintains strict quality standards.

His philosophy is simple: "We're not just a platform; we're a promise. When a family trusts us with their parents, we have to deliver perfectly, every single time."`,
    image: '/team/ayush.jpg',
    location: 'India',
    linkedin: 'https://www.linkedin.com/in/ayush-dixit-0589572a4/',
    email: 'ayush@carebow.com',
    funFact: 'Has personally interviewed over 500 caregivers to build the CareBow network.',
    expertise: ['Operations', 'Vendor Partnerships', 'Quality Assurance', 'Customer Success'],
  },
  {
    id: 'rohan',
    name: 'Rohan',
    role: 'Lead Engineer - Backend',
    shortBio: 'Building the secure, scalable infrastructure that powers CareBow.',
    fullBio: `Rohan is the technical backbone of CareBow, responsible for building and maintaining the backend systems, databases, and APIs that power the platform. He ensures that your parents' health data is secure and that our services run smoothly 24/7.

With expertise in cloud infrastructure, database optimization, and API development, Rohan has architected CareBow's systems to handle millions of health conversations while maintaining strict security standards.

He's particularly passionate about building systems that are not just technically excellent but also accessible and fast, even on low-bandwidth connections — because he knows that many elderly users may not have the fastest internet.`,
    image: '/team/rohan.jpg',
    location: 'India',
    linkedin: 'https://linkedin.com',
    email: 'rohan@carebow.com',
    funFact: 'Once stayed up 36 hours straight to fix a production issue affecting emergency alerts.',
    expertise: ['Backend Development', 'DevOps', 'Database Architecture', 'Security', 'AI Integration'],
  },
  {
    id: 'rishav',
    name: 'Rishav',
    role: 'Lead Engineer - Frontend',
    shortBio: 'Crafting beautiful, accessible interfaces that even technophobic grandparents can use.',
    fullBio: `Rishav leads frontend development at CareBow, creating the mobile apps and web interfaces that families interact with daily. His obsession? Making technology so simple that even a 75-year-old who's never used a smartphone can navigate it comfortably.

He's built every screen in the CareBow app with accessibility in mind — large touch targets, readable fonts, intuitive navigation, and a calming color palette that doesn't overwhelm. He regularly tests new features with actual elderly users to ensure usability.

Rishav believes that good design is invisible. If users are thinking about the interface, you've failed. The goal is for families to focus on what matters: their loved ones, not the technology.`,
    image: '/team/rishav.jpg',
    location: 'India',
    linkedin: 'https://linkedin.com',
    email: 'rishav@carebow.com',
    funFact: 'Tests every new feature by having his grandmother use it first.',
    expertise: ['React Native', 'Mobile Development', 'UI/UX Design', 'Accessibility', 'Animation'],
  },
];

export const advisors: TeamMember[] = [];
