import { WindowControls } from "@components";
import { socials } from "@constants";
import WindowWrapper from "@hoc/WindowWrapper"

const Contact = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact me</h2>
            </div>

            <div className="p-5 space-y-5">
                <img src="images/shaheer.png" alt="Shaheer" className="w-20 rounded-full" />

                <h3>Let's Connect</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, sint magni.</p>
                <p className="italic">shaheershaikh.codes@gmail.com</p>

                <ul>
                    {socials.map(({ id, text, icon, bg, link }) => (
                        <li key={id} style={{ backgroundColor: bg }}>
                            <a 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                title={text}
                            >
                                <img src={icon} alt={text} className="size-5" />
                                <p>{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;
