export default function ActionCards({ title, icon }){
    return(
        <>
            <button className="custom-card-btn shadow-sm">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <i className={`bi ${icon} mb-3`} style={{ fontSize: '2.5rem' }}></i>
                    <h5 className="card-title m-0 text-center">{ title || "Título" }</h5>
                </div>
                </button>
        </>
    )
}