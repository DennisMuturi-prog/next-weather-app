"use client"
function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <p>an error occurred, try again later</p>
      <button className="btn btn-error" onClick={() => reset()}>
        Refresh
      </button>
    </div>
  );
}

export default Error;