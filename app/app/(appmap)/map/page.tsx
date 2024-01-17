import { Suspense } from "react";
import { Map } from "../_components/map";
import { MapDashboard } from "../_components/map-dashboard";

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <main>
      <div>
        <div className="flex flex-col h-screen">
          <div className="h-[50%]">
            <Map />
          </div>
          <div className="h-[50%]">
            <Suspense fallback={<MapDashboard.Skeleton />}>
              <MapDashboard />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
