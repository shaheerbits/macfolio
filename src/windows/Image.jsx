import { WindowControls } from "@components";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";

const Image = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;

    if (!data) return null;

    const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2 className="font-medium">{name}</h2>
      </div>

      <div className="p-4 flex justify-center">
        {
            imageUrl ?
            <img src={imageUrl} alt={name} className="max-w-full rounded-md" />
            : null
        }
      </div>
    </>
  )
}

const ImageWindow = WindowWrapper(Image, 'imgfile');

export default ImageWindow;
