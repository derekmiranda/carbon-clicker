import "./Logs.css";

export interface LogsProps {
  logs: string[];
}

export default function Logs({ logs }: LogsProps) {
  return (
    <div>
      <h2>Logs</h2>
      <div className="logs-box">
        {logs.map((log) => (
          <p>
            {"> "}
            {log}
          </p>
        ))}
      </div>
    </div>
  );
}
