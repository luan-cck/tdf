<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Excel;

class SMSSentExport implements FromView
{
    use Exportable;

    /**
     * It's required to define the fileName within
     * the export class when making use of Responsable.
     */
    private $fileName = 'sms_sent.csv';

    /**
     * Optional Writer Type
     */
    private $writerType = Excel::CSV;

    /**
     * Optional headers
     */
    private $headers = [
        'Content-Type' => 'text/csv',
    ];

    private $smsList = [];

    public function __construct($smsList) {
        $this->smsList = $smsList;
    }

    public function view(): View
    {
        return view('dashboard.sms.export', [
            'smsList' => $this->smsList
        ]);
    }
}
