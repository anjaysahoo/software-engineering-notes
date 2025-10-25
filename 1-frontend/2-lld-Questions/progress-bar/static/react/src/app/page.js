import ProgressBar from "@/components/progress-bar/progress-bar";

export default function Home() {
  return (
      <>
        <ProgressBar value={25}></ProgressBar>
        <ProgressBar value={75}></ProgressBar>
        <ProgressBar value={100}></ProgressBar>
        <ProgressBar value={0}></ProgressBar>
      </>
  );
}
