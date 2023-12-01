import { Link } from 'react-router-dom'
import '../styles/side.css'


export function Sidebar(){
    
    return (
        <div className="navigation">
            <ul>
                <li>
                    <Link className='a' to="/inicio">
                        <span className="icon">
                            <ion-icon name="bus-outline"></ion-icon>
                        </span>
                        <span className="title">SANTA ROSA</span>
                     </Link>
                </li>

                <li>
                    <Link className='a' to="/inicio">
                        <span className="icon">
                            <ion-icon name="home-outline"></ion-icon>
                        </span>
                        <span className="title">Inicio</span>
                    </Link>
                </li>

                <li>
                    <Link className='a' to="/conductores">
                        <span className="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span className="title">Conductores</span>
                    </Link>
                </li>
                
                <li>
                    <Link className='a' to="/clientes">
                        <span className="icon">
                            <ion-icon name="person-add-outline"></ion-icon>
                        </span>
                        <span className="title">Clientes</span>
                    </Link>
                </li>
                <li>
                    <Link className='a' to="/conductores">
                        <span className="icon">
                            <ion-icon name="albums-outline"></ion-icon>
                        </span>
                        <span className="title">Facturas</span>
                    </Link>
                </li>

                <li>
                    <Link className='a' to="/conductores">
                        <span className="icon">
                            <ion-icon name="help-outline"></ion-icon>
                        </span>
                        <span className="title">Proveedor</span>
                    </Link>
                </li>
                <li>
                    <Link className='a' to="/conductores">
                        <span className="icon">
                        <ion-icon name="map-outline"></ion-icon>
                        </span>
                        <span className="title">Geolocalización</span>
                    </Link>
                </li>
                <li>
                    <Link className='a' to="/conductores">
                        <span className="icon">
                            <ion-icon name="chatbubble-outline"></ion-icon>
                        </span>
                        <span className="title">Comentarios</span>
                    </Link>
                </li>

                <li>
                    <Link className='a' to="/conductores">
                        <span className="icon">
                            <ion-icon name="settings-outline"></ion-icon>
                        </span>
                        <span className="title">Configuracion</span>
                    </Link>
                </li>

               

                <li>
                    <Link className='a' to="/login">
                        <span className="icon">
                            <ion-icon name="log-out-outline"></ion-icon>
                        </span>
                        <span className="title">Salir</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}