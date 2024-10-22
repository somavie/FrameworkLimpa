import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";

interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex-col flex items-center justify-center p-6">
        {children}
      </div>

      <div className="hidden my-10 md:block">
        <Divider orientation="vertical" />
      </div>

      <div
        className="hidden md:flex flex-1 relative flex items-center justify-center p-6 bg-cover bg-center"
        style={{ backgroundImage: 'url("/login2.png")' }}
      >
        <div className="z-10">
          <h1 className="font-bold text-[45px] text-white">
            Nome Do Sistema
          </h1>
          <div className="font-light text-slate-300 mt-4">
            Slogan.
          </div>
        </div>
      </div>
    </div>
  );
};
