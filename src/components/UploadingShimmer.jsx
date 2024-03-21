import { HashLoader } from "react-spinners";

function UploadingShimmer() {
	return (
		<div className="SHIMMER fixed z-10 flex justify-center top-0 h-[100vh] w-[100vw] bg-gray-400 opacity-70">
			<div className="border-black my-auto mx-auto">
				<HashLoader
					color={"blue"}
					// loading={loading}
					// cssOverride={override}
					className=""
					size={60}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			</div>
		</div>
	);
}

export default UploadingShimmer;
