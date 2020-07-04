#!/bin/bash
# respectfully copied from https://github.com/pascalgrimaud/generator-jhipster/blob/d0f7a7700a8c9e524586e0260f174985afb5c068/test-integration/scripts/24-tests-e2e.sh
#-------------------------------------------------------------------------------
# Functions
#-------------------------------------------------------------------------------
launchCurlOrCypress() {
    retryCount=1
    maxRetry=10
    httpUrl="http://localhost:8080"

    rep=$(curl -v "$httpUrl")
    status=$?
    while [ "$status" -ne 0 ] && [ "$retryCount" -le "$maxRetry" ]; do
        echo "*** [$(date)] Application not reachable yet. Sleep and retry - retryCount =" $retryCount "/" $maxRetry
        retryCount=$((retryCount+1))
        sleep 10
        rep=$(curl -v "$httpUrl")
        status=$?
    done

    if [ "$status" -ne 0 ]; then
        echo "*** [$(date)] Not connected after" $retryCount " retries."
        return 1
    fi

    retryCount=0
    maxRetry=5
    until [ "$retryCount" -ge "$maxRetry" ]
    do
        result=0
        if [[ -f "tsconfig.json" ]]; then
            npm run e2e
        fi
        result=$?
        [ $result -eq 0 ] && break
        retryCount=$((retryCount+1))
        echo "*** e2e tests failed... retryCount =" $retryCount "/" $maxRetry
        sleep 15
    done
    return $result
}

#-------------------------------------------------------------------------------
# compile the jar for dev and Run ui test
#-------------------------------------------------------------------------------

cd ../jhipster
mvnw -Pdev -DskipTests -Dcheckstyle.skip clean verify
java \
    -jar target/*.jar &
echo $! > .pidRunApp
cd ../ui-test
sleep 30

launchCurlOrCypress
resultRunApp=$?
kill $(cat .pidRunApp)

cat .pidRunApp
exit $((resultRunApp))
