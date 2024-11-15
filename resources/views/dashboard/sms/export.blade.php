<table>
    <thead>
        <tr>
            <th> 作成日</th>
            <th> 業務名</th>
            <th> 申出受付番号</th>
            <th> 証券番号</th>
            <th> 契約者名</th>
            <th> 携帯電話</th>
            <th> 作成者</th>
            <th> ステータス</th>
        </tr>
    </thead>
    <tbody>
        @foreach($smsList as $item)
        <tr>
            <td>{{ date('Y-m-d', strtotime($item['created_at'])); }}</td>
            <td>{{ \App\Constants::REQUEST_TYPE[$item["request_type_name"]] }}</td>
            <td>{{ $item["application_reception_number"] }}</td>
            <td>{{ $item["policy_number"] }}</td>
            <td>{{ $item["contractor_name"] }}</td>
            <td>{{ $item["phone"] }}</td>
            <td>{{ $item["username"] }}</td>
            <td>{{ \App\Constants::STATUS[$item["status"]] }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
