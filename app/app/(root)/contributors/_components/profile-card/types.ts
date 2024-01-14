export interface IProfileCardProps {
  login: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  profile_pic: string;
  description: string;
  specialization: string;
  socials: {
    github: string;
    linkedin: string;
  };
}
