
param (
    [string]$query, # Database query to run.  Must be in single quotes.
    [string]$queryType # Query type. Any valid value from System.Data.CommandType
) # end param

# Global configuration object.  Set during Init.
$Configuration

function Main ($query, $queryType) {

     Init

     $dt = ExecuteDataTable $Configuration.database.connectionString $query $queryType
     $Columns = New-Object System.Collections.ArrayList

     # Output column names
     $dt.Columns | ForEach-Object { $Columns.Add( $_.ColumnName ) > $null }
     $output = "`"" + ( $Columns -Join "`"`,`"" ) + "`""
     Write-Host $output

     # Output values for each row.
     $dt.Rows | ForEach-Object {
        $Columns.Clear()
        $_.ItemArray | ForEach-Object { $Columns.Add($_) > $null }
        $output = "`"" + ( $Columns -Join "`"`,`"" ) + "`""
        Write-Host $output
     }
}

<#
    @connectionString - ADO.Net connection string for connecting to the database server.
    e.g. A connectionString value using Windows authention might look something like
         "Data Source=MY_SERVER\INSTANCE,PORT; Initial Catalog=MY_DATABASE; Integrated Security=true;"

    @query - The query to execute (query or stored procedure to call)

    @queryType - String literal containing a value from System.Data.CommandType, usually either "TEXT" or "StoredProcedure" 

    @params - Iterable collection of SqlParameter objects.
#>
function ExecuteDataTable( $connectionString, $query, $queryType, $params ) {

    $connection = new-object system.data.SqlClient.SQLConnection($connectionString)
    $command = new-object system.data.SqlClient.sqlcommand($query, $connection)
    $command.CommandType = $queryType

    $dataTable = new-object system.data.DataTable

    # Powershell 2 doesn't have a using statement, so we do it by hand.
    $connection.Open()
    $dataAdapter = new-object system.data.SqlClient.SqlDataAdapter( $command )
    try {
        $dataAdapter.Fill( [system.data.DataTable]$dataTable )
        $command.Parameters.Clear()
    }
    finally {
        $dataAdapter.Dispose()
        $connection.Close()
    }

    # Powershell converts enumerable objects into an array of Object[].  By using the comma operator to wrap
    # $dataTable in an array containing a single item, the caller gets back just the original object.
    # This allows us to keep the methods of the DataTable class.
    return ,$dataTable
}

<#
    Load NVelocity assembly, and other hoo-hah as needed.
#>
function Init() {

    # Load configuration
    [xml]$settings = Get-Content "settings.xml"
    $Global:Configuration = $settings.settings

}

Main $query $queryType