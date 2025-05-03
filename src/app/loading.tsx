function Loading() {
  return (
    <div>
        <div className="flex">
            <div className="skeleton sidebar"></div>
            <div className="w-full ml-1">
                <div className="mb-2 flex flex-wrap gap-2">
                    <div className="card skeleton h-80 w-72"></div>
                    <div className="card skeleton h-80 w-72"></div>
                    <div className="card skeleton h-80 w-72"></div>
                </div>
                <div className="flex gap-2">
                    <div className="card skeleton h-40"></div>
                    <div className="card skeleton h-40"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Loading