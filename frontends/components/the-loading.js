import LoadingOverlay from "react-loading-overlay";

export default function(){
	return (
		<LoadingOverlay
			text="Loading your content . . ."
			active={ true }
			spinner>
			<div style={ {
				height : '100vh'
			} }></div>
		</LoadingOverlay>	
	)
}