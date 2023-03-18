export const UserCreate = ({onClose, onUserCreateSubmit}) =>{


    return(        
        <div className="overlay">
            <div className="backdrop"></div>
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>Add User</h2>
                    </header>
                    <form 
                        onSubmit={(e) => onUserCreateSubmit(e)}
                    >
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input 
                                        id="email"
                                        name="email" 
                                        type="text" 
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input 
                                        id="role"
                                        name="role" 
                                        type="role" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="form-actions">
                            <button id="action-save" className="btn" type="submit">Save</button>
                            <button id="action-cancel" className="btn" type="button" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}