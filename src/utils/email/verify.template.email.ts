export const verifyEmail = ({
  otp,
  title,
}: {
  otp: number;
  title: string;
}): string => {
  return `
            Title / ${title}
            otp/${otp}
  `;
};
