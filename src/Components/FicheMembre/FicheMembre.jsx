import './FicheMembre.css'

const FicheMembre = () => {
  return (
    <>
      <section className='section-container'>
        <header className='title'>
          Member Profile
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="info-section">
                <div className="info-item">
                  <strong>First Name:</strong> <span>John</span>
                </div>
                <div className="info-item">
                  <strong>Last Name:</strong> <span>Doe</span>
                </div>
                <div className="info-item">
                  <strong>Email:</strong> <span>john.doe@example.com</span>
                </div>
                <div className="info-item">
                  <strong>Phone:</strong> <span>+123456789</span>
                </div>
                <div className="info-item">
                  <strong>Field of Study:</strong> <span>Computer Science</span>
                </div>
                <div className="info-item trainings-section">
                  <strong>Acquired Trainings:</strong>
                  <div className="training-list">
                    <div className="training-item">
                      <img src="training1-logo.png" alt="Training 1 Logo" className="training-logo" />
                      <span>Training Name 1</span>
                    </div>
                    <div className="training-item">
                      <img src="training2-logo.png" alt="Training 2 Logo" className="training-logo" />
                      <span>Training Name 2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FicheMembre
