
export default function StringLimit(string, length) {
    if (string) {
        if (string.length <= length) {
            return string
        }
        else {
            let trimmedString = string.substr(0, length) + ' ...';
            return trimmedString
        }
    }
}
