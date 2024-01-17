/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1dc54VJ6pTz
 */
import { CardContent, Card, CardFooter } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { IProfileCardProps } from "./types";
import Link from "next/link";

export const ProfileCard = (props: IProfileCardProps) => {
  const avatar_fallback =
    props.first_name.charAt(0).toUpperCase() +
    props.last_name.charAt(0).toUpperCase();
  return (
    <Card className="w-full max-w-md">
      <CardContent className="grid gap-4 pt-4">
        <div className="flex items-center gap-4">
          <Link href={`/r/${props.login}`}>
            <Avatar>
              <AvatarImage src={props.profile_pic} />
              <AvatarFallback>{avatar_fallback}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="space-y-1">
            <Link href={`/r/${props.login}`}>
              <h4 className="text-lg font-semibold">@{props.login}</h4>
            </Link>
            <p className="text-sm">{props.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <h5 className="text-sm font-semibold">Name</h5>
            <p className="text-sm">
              {props.last_name +
                " " +
                props.middle_name +
                " " +
                props.first_name}
            </p>
          </div>
          <div className="space-y-1">
            <h5 className="text-sm font-semibold">Specialization</h5>
            <p className="text-sm">{props.specialization}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-4 ">
        <div className="space-y-1">
          <Link href={props.socials.github}>
            <GithubIcon className="w-6 h-6" />
          </Link>
        </div>
        <div className="space-y-1">
          <Link href={props.socials.linkedin}>
            <LinkedinIcon className="w-6 h-6" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
