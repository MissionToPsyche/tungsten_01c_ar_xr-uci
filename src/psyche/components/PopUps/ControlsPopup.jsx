function ControlsPopup({ onClose }) {
	return (
		<div className="controls-popup">
			<button className="close-button" onClick={onClose}>X</button>
			<div className="controls-content">
				<p>Controls:</p>
				<ul>
					<li>Pinch to zoom</li>
					<li>Swipe to move</li>
				</ul>
			</div>
		</div>
	);
}


export default ControlsPopup;