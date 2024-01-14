import { CONTRIBUTORS } from "../../contants";
import { ProfileCard } from "../profile-card";

export const ProfileCards = () => {
  return (
    <main>
      <div className="flex flex-col items-center pb-4">
        <h1 className="text-2xl font-semibold">Contributors</h1>
        <p className="text-sm text-gray-500">
          This project is made possible by the following contributors.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4 justify-items-center">
        {CONTRIBUTORS.map((contributor) => (
          <ProfileCard key={contributor.login} {...contributor} />
        ))}
      </div>
    </main>
  );
};
