
interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    gradient: string;
    additionalContent?: React.ReactNode;
}

export default function DashboardCard({ title, value, icon, gradient, additionalContent }: DashboardCardProps) {
    return (
        <div 
            className={` h-[80px] rounded-xl p-4 shadow-lg text-white transform hover:scale-105 transition-transform`}
             style={{ background: gradient }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs opacity-90 font-medium">{title}</p>
                    <p className="text-xl font-bold ">{value}</p>
                    {additionalContent}
                </div>
                {icon}
            </div>
        </div>
    );
}