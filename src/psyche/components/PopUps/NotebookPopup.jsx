
  
  function NotebookPopup({ onClose }) {
    return (
      <div className="controls-popup">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="controls-content">
          Notebook Content
        </div>
      </div>
    );
  }
	
	
	export default NotebookPopup;