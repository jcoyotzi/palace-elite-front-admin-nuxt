export const LockOffRoomAccessCode = ['PS1', 'GP1']

export const PresidentialSecondRoomCodes = ['PS2', 'GP2']

export function getNextRoomAccessCode(roomAccessCode: string): string {
  return roomAccessCode.includes('1')
    ? roomAccessCode.replace('1', '2')
    : roomAccessCode.replace('2', '1')
}
