import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;

    if (!data) return null;

    const { name, subtitle, image, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target='txtfile' />
        <div className="font-medium">{name}</div>
      </div>

      <div className="flex flex-col gap-2 items-center p-6">
        {
            image && <div className="w-full">
                <img src={image} alt={name} className="rounded-md" />
            </div>
        }

        {
            subtitle && <h2 className="text-start my-4">
                {subtitle}
            </h2>
        }

        {
            description && description.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
            ))
        }
      </div>
    </>
  )
}

const TextWindow = WindowWrapper(Text, 'txtfile');

export default TextWindow;
