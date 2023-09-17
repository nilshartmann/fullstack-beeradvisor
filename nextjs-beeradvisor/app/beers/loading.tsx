import LoadingIndicator from "@/app/components/LoadingIndicator";

export default function BeerPageLoading() {
  return (
    <LoadingIndicator placeholder={"🍺"}>
      Beer List loading... please wait
    </LoadingIndicator>
  );
}
