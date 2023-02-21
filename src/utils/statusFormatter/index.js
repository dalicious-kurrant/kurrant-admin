export function scheduleFormatted(data) {
    switch (data) {
        case 0:
            return "대기"
        case 1:
            return "승인"
        case 2:
            return "거ㄹ"
        default:
            return "승인"
    }
}