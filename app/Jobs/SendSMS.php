<?php

namespace App\Jobs;

use Aws\Exception\AwsException;
use Aws\Sns\SnsClient;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendSMS implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $message = null;
    protected $phoneNumber = null;

    /**
     * Create a new job instance.
     */
    public function __construct($message, $phoneNumber)
    {
        if (in_array(config('app.env'), ['local', 'develop'])) {
            if (!in_array($phoneNumber, config('services.sns.allow_phone_number'))) {
                throw new Exception('Phone number was not provided in whitelist');
            }
        }
        $this->message = $message;
        $this->phoneNumber = $phoneNumber;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        # https://docs.aws.amazon.com/sns/latest/dg/channels-sms-best-practices.html
        try {
            // TODO: Validate phoneNumber

            $senderId = 'TDF-LIFE';
            $snsClient = new SnsClient([
                'region'      => config('services.sns.region'),
                'credentials' =>  [
                    'key' => config('services.sns.key'),
                    'secret' => config('services.sns.secret'),
                ]
            ]);
            $snsClient->SetSMSAttributes([
                'attributes' => [
                    'DefaultSMSType' => 'Transactional',
                    'DefaultSenderID' => $senderId
                ],
            ]);
            $data = [
                'Message' => $this->message,
                'PhoneNumber' => $this->phoneNumber,
            ];
            $result = $snsClient->publish($data);
            # Result only return PUBLISH status. Not the Endpoint's receive status
            # TODO: Get result statistic. Need research
        } catch (AwsException $e) {
            // output error message if fails
            error_log($e->getMessage());
        }
    }
}
