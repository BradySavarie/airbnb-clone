import { PlacesType } from '../pages/PlacesPage';

type PlaceImgProps = {
    place: PlacesType;
    index?: number;
    classname?: string | null;
};

export default function PlaceImg({
    place,
    index = 0,
    classname = null,
}: PlaceImgProps) {
    if (!place.photos?.length) {
        return;
    }

    if (!classname) {
        classname = 'object-cover';
    }

    return (
        <img
            className={classname}
            src={'http://localhost:4000/uploads/' + place.photos?.[index]}
            alt=""
        />
    );
}
