import { Link } from 'react-router-dom';
import { CONTRIBUTORS } from '../constants/constants';
import { icons } from '../assets/icons.jsx';

export function Footer() {
    const constributors = CONTRIBUTORS.map((contributor) => (
        <div
            key={contributor.name}
            className="flex items-center justify-center gap-3"
        >
            <div className="flex items-center justify-center gap-2">
                <div className="overflow-hidden rounded-full size-[25px]">
                    <img
                        src={contributor.image}
                        alt={`contributor ${contributor.name} image`}
                        className="size-full object-cover"
                    />
                </div>
                <div className="text-nowrap text-sm font-medium">
                    {contributor.name}
                </div>
            </div>
            <div className="flex items-center justify-evenly gap-2">
                {Object.entries(contributor.socials).map(
                    ([platform, url]) =>
                        url && (
                            <Link
                                key={platform}
                                to={url}
                                target="_blank"
                                className="bg-[#111111] hover:brightness-150 p-[3px] rounded-[5px]"
                            >
                                <div className="size-[12px] fill-[#b7b1b1]">
                                    {icons[platform]}
                                </div>
                            </Link>
                        )
                )}
            </div>
        </div>
    ));
    return (
        <div className="text-[#c7c7c7] overflow-x-scroll shadow-2xl shadow-">
            <div className="border-t-[0.01rem] border-t-[#9a9a9a]" />
            <div className="flex items-center justify-evenly gap-4 py-2">
                <div className="text-xs text-nowrap">
                    © 2024 notes manager. All rights reserved.
                </div>
                <div className="flex items-center justify-between gap-4">
                    {constributors}
                </div>
            </div>
        </div>
    );
}
