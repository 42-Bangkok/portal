import { Suspense } from "react"
import { Map } from "../_components/map"
import { MapDashboard } from "../_components/map-dashboard"

export default function Page() {
  return (
    <main>
      <div>
        <div className="flex flex-col h-screen">
          <div className="h-[50%]">
            <Map lat={13.7298941} lng={100.7756574} zoom={16} />
          </div>
          <div className="h-[50%]">
            <Suspense fallback={<MapDashboard.Skeleton />}>
              <MapDashboard />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
