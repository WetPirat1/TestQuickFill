import EmployeeForm from '../components/EmployeeForm';
import AgreementText from '../components/AgreementText';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg">
        <EmployeeForm />
        <AgreementText />
      </div>
    </div>
  );
}