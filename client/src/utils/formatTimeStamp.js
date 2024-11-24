import { formatDistanceToNow, parseISO } from 'date-fns';

export default function formatTimeStamp(timestamp) {
    const ans = formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
    return ans;
}
