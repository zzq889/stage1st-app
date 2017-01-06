ifeq (rename,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

all:

rename:
	./support/rename.sh $(RUN_ARGS)

clean: clean.android clean.ios

clean.android:
	cd android; ./gradlew clean

clean.ios:
	rm -rf ios/build

bundle.android:
	cd android && ./gradlew assembleRelease
