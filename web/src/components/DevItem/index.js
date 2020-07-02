import React, { useState } from 'react';
import { FaEllipsisV, FaRegWindowClose } from 'react-icons/fa';
import api from '../../services/api';
import './styles.css';

function DevItem({ dev }) {
    const [on, setOn] = useState(false);
    const [edit, setEdit] = useState(false)

    const [bio, setBio] = useState('');
    const [techs, setTechs] = useState('');
    const [avatar_url, setAvatarUrl] = useState('');

    //open de delete and update items
    function toggleMenu() {
        if (on) {
            setOn(false);
        } else {
            setOn(true);
        }
    }

    //delete the devs
    async function deleteDev() {
        const devId = dev._id;

        if (window.confirm('Deseja mesmo remover esse dev?')) {
            await api.delete(`/devs/${devId}`)
            alert('Para atualizar a lista de devs, aperte F5');
        }
    }

    //open de edit modal
    function editDev() {
        if (edit) {
            setEdit(false);
        } else {
            setEdit(true);
        }
    }
    async function handleEditDev(e) {
        e.preventDefault();
        await api.put(`/devs/${dev._id}`, {
            techs,
            bio,
            avatar_url
        })
        alert('Atualize a pagina');
        setEdit(false);
    }

    function closeModal(){
        setEdit(false);
    }

    return (
        <>
            <li className="dev-item">
                <header>
                    <img src={dev.avatar_url} alt={dev.name} />
                    <div className="user-info">
                        <strong>{dev.name}</strong>
                        <span>{dev.techs.join(', ')}</span>
                    </div>
                    <button onClick={toggleMenu} className="edit-links">
                        <FaEllipsisV />
                    </button>
                    {on === true ?
                        <div className={`${on === true ? 'toggle' : 'menu'}`}>
                            <button onClick={editDev}>Editar</button>
                            <button onClick={deleteDev}>Excluir</button>
                        </div>
                        : ""
                    }
                </header>
                <p>{dev.bio}</p>
                <a href={`https://github.com/${dev.github_username}`} target="blank">Acessar perfil no github</a>
            </li>
            <>
                {edit === true ?
                    <div className="edit-dev">
                        <button className="close-modal" onClick={closeModal}>
                            <FaRegWindowClose />
                        </button>
                        <form onSubmit={handleEditDev}>
                            <strong>Atualizar</strong>
                            <div className="input-block">
                                <label htmlFor="bio">Bio</label>
                                <input 
                                    type="text" 
                                    name="bio" 
                                    id="bio"
                                    value={bio}
                                    onChange={e => setBio(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="techs">Tecnologias</label>
                                <input 
                                    type="text" 
                                    name="techs" 
                                    id="techs"
                                    value={techs}
                                    onChange={e => setTechs(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="avatar_url">URL imagem</label>
                                <input 
                                    type="text" 
                                    name="avatar_url" 
                                    id="avatar_url"
                                    value={avatar_url}
                                    onChange={e => setAvatarUrl(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Atualizar</button>
                        </form>
                        <div className="data-dev">
                            <div className="data-block">
                                <label>Bio</label>
                                <span>{dev.bio}</span>
                            </div>
                            <div className="data-block">
                                <label>Tecnologias</label>
                                <span>{dev.techs.join(', ')}</span>
                            </div>
                            <div className="data-block">
                                <label>URL imagem</label>
                                <span>{dev.avatar_url}</span>
                            </div>
                        </div>
                    </div>
                    : ""
                }
            </>
        </>
    )
}

export default DevItem;