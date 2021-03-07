import { FC, ReactElement } from "react";

const Home: FC = (): ReactElement =>  {

  return <>
    <div className="h-screen w-full flex">
      <p className={`mx-auto mt-auto mb-auto text-7xl text-blue-400`}>
        Hello, mister.
      </p> 
    </div>
  </>;
}

export default Home;
