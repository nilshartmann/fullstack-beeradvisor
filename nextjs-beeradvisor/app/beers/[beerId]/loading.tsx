import LoadingIndicator from "@/app/components/LoadingIndicator";

export default function BeerPageLoading() {
  return (
    <LoadingIndicator placeholder={"🍺"}>
      Beer Details Loading... please wait
    </LoadingIndicator>
  );
}
