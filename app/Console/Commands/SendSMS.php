<?php

namespace App\Console\Commands;

use App\Jobs\SendSMS as JobsSendSMS;
use Illuminate\Console\Command;

class SendSMS extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-sms';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $message = "This message is sent from Laravel App"; // Testing body
        $phoneNumber = "+819011476354"; // Testing number
        JobsSendSMS::dispatchSync($message, $phoneNumber);
    }
}
