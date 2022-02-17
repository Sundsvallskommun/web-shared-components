export default {
    title: "Komponenter/Kort",
    //component: Breadcrumb,
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
};

export const Kort = () => (
    <div className="flex flex-col space-y-2">
        <ul className="card-list">
            <li className="card">
                <span className="avatar material-icons">person</span>
                <h6 className="my-6">1. Skapa ett konto</h6>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora necessitatibus illum doloremque nihil consequatur totam.</p>
            </li>
            <li className="card">
                <span className="avatar material-icons-outlined">assignment</span>
                <h6 className="my-6">2. API-dokumentation</h6>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora necessitatibus illum doloremque nihil consequatur totam.</p>
            </li>
            <li className="card">
                <span className="avatar material-icons">phonelink</span>
                <h6 className="my-6">3. Kom igång</h6>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora necessitatibus illum doloremque nihil consequatur totam.</p>
            </li>
            <li className="card">
                <span className="avatar material-icons">person</span>
                <h6 className="my-6">4. Lorem ipsum</h6>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora necessitatibus illum doloremque nihil consequatur totam.</p>
            </li>
        </ul>
    </div>
);