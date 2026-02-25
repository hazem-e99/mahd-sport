import { QRCodeCanvas } from "qrcode.react";

interface QRCodeComponentProps {
  data: string;
  size?: number;
}

const QRCodeComponent = ({ data, size = 100 }: QRCodeComponentProps) => {
  return (
    <div className="employee-qr-code">
      <div className="qr-code-container">
        <QRCodeCanvas value={data} size={size} level="M" includeMargin={false} />
      </div>
    </div>
  );
};

export default QRCodeComponent;
