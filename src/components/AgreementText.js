
export default function AgreementText() {
  return (
    <div className="w-full md:w-1/2 p-6">
      <h2 className="text-xl font-semibold mb-4">10. Applicable Law</h2>
      <p className="text-gray-700 mb-4">
        This Software Development Agreement and the interpretation of its terms shall be governed by and construed in accordance with the laws of the State of California and subject to the exclusive jurisdiction of the federal and state courts located in Alpine, California.
      </p>
      <p className="text-gray-700 mb-4">
        IN WITNESS WHEREOF, each of the Parties has executed this Software Development Agreement, both Parties by its duly authorized officer, as of the day and year set forth below.
      </p>
      <div className="space-y-2">
        <p className="text-gray-700">
          [<span className="text-orange-500">Employee FirstName</span>]
        </p>
        <p className="text-gray-700">
          [<span className="text-orange-500">Employee LastName</span>]
        </p>
        <p className="text-gray-700">
          [<span className="text-orange-500">Employee CompanyAddress</span>]
        </p>
        <p className="text-gray-700">
          [<span className="text-orange-500">Employee Email</span>]
        </p>
      </div>
    </div>
  );
}