import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

// IMPORTANT: Fully REPLACE this with your own code
function PlaceholderIndex() {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#fcfbf8' }}>
      <img data-lovable-blank-page-placeholder="REMOVE_THIS" src="/placeholder.svg" alt="Your app will live here!" />
    </div>
  );
}

function Index() {
  return <PlaceholderIndex />;
}
